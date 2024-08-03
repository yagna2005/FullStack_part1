package com.project.practice.controller;

import com.project.practice.model.Plan;
import com.project.practice.service.PlanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "http://localhost:3000")
public class PlanController {

    @Autowired
    private PlanService planService;

    @PostMapping("/addplan")
    public ResponseEntity<?> addNewPlan(@RequestBody Plan plan) {
        try {
            Plan newPlan = planService.savePlan(plan);
            return ResponseEntity.ok(newPlan);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllPlans() {
        try {
            List<Plan> planList = planService.getAllPlans();
            return ResponseEntity.ok(planList);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePlan(@PathVariable Long id, @RequestBody Plan updatedPlan) {
        try {
            Optional<Plan> optionalPlan = planService.getPlanById(id);
            if (optionalPlan.isPresent()) {
                Plan plan = optionalPlan.get();
                plan.setCategory(updatedPlan.getCategory());
                plan.setCent(updatedPlan.getCent());
                plan.setEstimatedAmount(updatedPlan.getEstimatedAmount());
                plan.setEngineerName(updatedPlan.getEngineerName());
                plan.setArchitect(updatedPlan.getArchitect());
                plan.setMobileNumber(updatedPlan.getMobileNumber());
                plan.setSampleImage(updatedPlan.getSampleImage());
                plan.setBlueprint(updatedPlan.getBlueprint());
                planService.savePlan(plan);
                return ResponseEntity.ok(plan);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Long id) {
        try {
            planService.deletePlan(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
