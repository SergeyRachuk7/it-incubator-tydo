
import { userReducer } from './user-reducer';
 
test("user reduser should increment only age", () => {
        const startState = {age: 20, childrenCount: 2, name: "Serega"}; 
        const endState = userReducer(startState, {type: "INCREMENT-AGE"}) 

        expect(endState.age).toBe(21); 
        expect(endState.childrenCount).toBe(2);
}); 


test("user reducer should increment only childrenCount", () => {
      const startState = {age: 20, childrenCount: 2, name: "Serega"};   
      const endState = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"})  
      expect(endState.childrenCount).toBe(3);   
      expect(endState.age).toBe(20);

});   
 

test("user reducer should increment only childrenCount", () => {
      const startState = { age: 20, childrenCount: 2, name: "Serega", };   
      // const newName  = "Viktor";
       const endState = userReducer(startState, {type: "INCREMENT-AGE"})  

      // expect(endState.name).toBe(newName);   

});   