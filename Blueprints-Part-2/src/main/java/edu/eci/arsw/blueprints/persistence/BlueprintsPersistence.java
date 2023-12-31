/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

/**
 *
 * @author hcadavid
 */
@Component
@Service
public interface BlueprintsPersistence {
    
    /**
     * 
     * @param bp the new blueprint
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException;
    
    /**
     * 
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String bprintname) throws BlueprintNotFoundException;

    /**
     * 
     * @param author blueprint's author
     * @return the blueprint of the given name and author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public List<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException;
    

    /**
     * 
     * @return all the blueprints 
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Set<Blueprint> getAllBlueprints() throws BlueprintNotFoundException;

    /**
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @param points blueprint's points
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void addBluePrintByParameters(String author, String bpName, List<List<Integer>> points) throws BlueprintPersistenceException;
    
    /**
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @param points blueprint's points
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void updateBlueprint(String newAuthor, String newName, List<List<Integer>> newPoints, Blueprint bp) throws BlueprintNotFoundException;

    /**
     * @param author blueprint's author
     * @param bprintname blueprint's author
     * @throws BlueprintPersistenceException if a blueprint with the same name already exists,
     *    or any other low-level persistence error occurs.
     */
    public void deleteBlueprint(String author, String bpName) throws BlueprintNotFoundException;
}
