package com.example.esd_hostel_service.service;


import com.example.esd_hostel_service.config.EmailProducer;
import com.example.esd_hostel_service.config.HostelConfirmation;
import com.example.esd_hostel_service.exception.StudentAllreadyAllocated;
import com.example.esd_hostel_service.exception.StudentDoesNotExists;
import com.example.esd_hostel_service.model.Hostel;
import com.example.esd_hostel_service.model.Student;
import com.example.esd_hostel_service.repo.HostelRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@Service
public class HostelService {

    @Autowired
    private HostelRepo hostelRepo;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EmailProducer emailProducer;


    public  ResponseEntity<?> getHostelsRoomsById(int id) throws Exception {
            Hostel hostel = hostelRepo.findById(id).get();
            return new ResponseEntity<>(hostel, HttpStatus.OK);
    }


    public ResponseEntity<?> getAllHostelsRooms(String name,int floor,int all) throws  Exception{

        List<Hostel> hostels = null;
        List<Hostel>Filter_List_by_name=new ArrayList<>();
        List<Hostel>Filter_List_by_floor=new ArrayList<>();
        List<Hostel>Filter_List_by_all=new ArrayList<>();


        hostels = hostelRepo.findAll();


        if(name.length()==0 && floor==0 && all==0){

        }else {


            if (name.length() > 0) {
                Filter_List_by_name = hostels.stream().filter(x -> x.getName().equals(name)).toList();
            }

            if (floor > 0) {
                if (name.length() > 0) {
                    if (Filter_List_by_name.size() > 0) {
                        Filter_List_by_floor = Filter_List_by_name.stream().filter(x -> x.getFloor() == floor).toList();
                    }
                } else {
                    Filter_List_by_floor = hostels.stream().filter(x -> x.getFloor() == floor).toList();

                }

            }

            if (all > 0) {

                if (all == 1) {

                    if (name.length() > 0 && floor > 0) {
                        Filter_List_by_all = Filter_List_by_floor.stream().filter(x -> x.getStudent() == null).toList();
                    } else if (floor > 0) {
                        Filter_List_by_all = Filter_List_by_floor.stream().filter(x -> x.getStudent() == null).toList();

                    } else if (name.length() > 0) {
                        Filter_List_by_all = Filter_List_by_name.stream().filter(x -> x.getStudent() == null).toList();
                    } else {
                        Filter_List_by_all = hostels.stream().filter(x -> x.getStudent() == null).toList();
                    }

                }

                if (all == 2) {
                    if (name.length() > 0 && floor > 0) {
                        Filter_List_by_all = Filter_List_by_floor.stream().filter(x -> x.getStudent() != null).toList();
                    } else if (floor > 0) {
                        Filter_List_by_all = Filter_List_by_floor.stream().filter(x -> x.getStudent() != null).toList();

                    } else if (name.length() > 0) {
                        Filter_List_by_all = Filter_List_by_name.stream().filter(x -> x.getStudent() != null).toList();
                    } else {
                        Filter_List_by_all = hostels.stream().filter(x -> x.getStudent() != null).toList();

                    }
                }

            }


            if (all != 0) {
                hostels = Filter_List_by_all;
            } else if (floor != 0) {
                hostels = Filter_List_by_floor;
            } else {
                hostels = Filter_List_by_name;
            }
        }


        if(hostels.isEmpty()) {
            List<List<List<Hostel>>> t=new ArrayList<>();
            return new ResponseEntity<>(t,HttpStatus.OK);
        }

        HashMap<String, HashMap<Integer,List<Hostel>>> hashMap = new  HashMap<>();
        for(Hostel hostel:hostels){
            if(hashMap.containsKey(hostel.getName())){
                if(hashMap.get(hostel.getName()).containsKey(hostel.getFloor())){
                    hashMap.get(hostel.getName()).get(hostel.getFloor()).add(hostel);
                }else{
                    List<Hostel> temp = new ArrayList<>();
                    temp.add(hostel);
                    hashMap.get(hostel.getName()).put(hostel.getFloor(), temp);
                }
            }else{
                HashMap<Integer,List<Hostel>> temp = new HashMap<>();
                List<Hostel> temp1 = new ArrayList<>();
                temp1.add(hostel);
                temp.put(hostel.getFloor(), temp1);
                hashMap.put(hostel.getName(), temp);
            }
        }

//        for(Map.Entry<String, HashMap<Integer, List<Hostel>>> entry:hashMap.entrySet()){
//            System.out.print(entry.getKey() + "->");
//            for(Map.Entry<Integer,List<Hostel>> entry1:entry.getValue().entrySet()){
//                System.out.println(entry1.getKey() + "->" + entry1.getValue());
//            }
//        }

        Collection<HashMap<Integer,List<Hostel>>> values = hashMap.values();

        // Creating an ArrayList of values
        ArrayList<HashMap<Integer,List<Hostel>>> listOfValues = new ArrayList<>(values);

        List<List<List<Hostel>>> val=new ArrayList<>();

        for(HashMap<Integer,List<Hostel>> map:listOfValues){
            Collection<List<Hostel>>final_pro=map.values();
            List<List<Hostel>> temp=new ArrayList<>(final_pro);
            val.add(temp);
        }
        return new ResponseEntity<>(val,HttpStatus.OK);






    }

    public void add_rooms(List<Hostel> hostels) throws  Exception{
            hostelRepo.saveAll(hostels);
    }

    public ResponseEntity<?> allocate_rooms(Hostel hostel) throws  Exception{


            Student st= studentService.FindStudentByID(hostel.getStudent().getStudentId());
            if(st==null){
                throw new StudentDoesNotExists("Student Does Not Exists..");
            }
            hostel.setStudent(st);
            Hostel hs=hostelRepo.findBystudent(hostel.getStudent());
            if(hs!=null){
                throw new StudentAllreadyAllocated("Student already allocated room");
            }
            hostel=hostelRepo.save(hostel);
            emailProducer.sendHostelAllocationService(new HostelConfirmation(hostel.getId(),hostel.getName(),hostel.getFloor(),hostel.getRoomNumber(),hostel.getStudent()));
            return  new ResponseEntity<>(hostel,HttpStatus.OK);


    }

    public ResponseEntity<?> vacant_room(Hostel hostel) throws Exception {
        Student st=studentService.FindStudentByID(hostel.getStudent().getStudentId());
        hostel.setStudent(null);
        hostel=hostelRepo.save(hostel);


        emailProducer.sendHostelVacantService(new HostelConfirmation(hostel.getId(),hostel.getName(),hostel.getFloor(),hostel.getRoomNumber(),st));
        return new ResponseEntity<>(hostel, HttpStatus.OK);
    }

    public ResponseEntity<?> getHostelName() {

        List<String>hostel_name=new ArrayList<>();
        hostel_name=hostelRepo.findDistinctByHostelName();
        return new ResponseEntity<>(hostel_name,HttpStatus.OK);
    }
}
