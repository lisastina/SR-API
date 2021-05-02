import style from '../css/Programs.module.css';
import ProgramsProgramCard from '../components/ProgramsProgramCard';
import { useContext, useEffect } from 'react';
import { ProgramContext } from '../contexts/ProgramContext';

const Programs = () => {
  const { programs, getAllPrograms, categories, getAllCategories, getProgramsByCategory } = useContext(ProgramContext);
  
  useEffect(() => {
    getAllCategories();
    getAllPrograms();
  }, []);

 

  const handleCategoryChange = (value) => {
    getProgramsByCategory(value)
  };
  
  return ( 
    <div className={style.programs}>
      <h1>Program och Poddar</h1>
      <hr/>
      <p>A - Ö</p>
      <div className={style.select}>
        <div className="customSelect">
        <select name="categories" id="categories" onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">Kategorier</option>
          {categories && categories.map(category => {
            return(
              <option key={category.id} value={category.id}>{category.name}</option>
              )})}
        </select>
        </div>
      </div>
      <div className={style.programCards}>
        {programs && programs.map(program => {
          return(
            <ProgramsProgramCard 
            key={program.id} 
            program={program}
            />
          )})}
      </div>
    </div>
   );
}
 
export default Programs;