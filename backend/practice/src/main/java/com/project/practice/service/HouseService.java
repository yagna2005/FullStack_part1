package com.project.practice.service;

import com.project.practice.model.House;
import com.project.practice.repository.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;

    public House saveHouse(House house) {
        return houseRepository.save(house);
    }

    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }

    public Optional<House> getHouseById(Long id) {
        return houseRepository.findById(id);
    }

    public void deleteHouse(Long id) {
        houseRepository.deleteById(id);
    }
}
