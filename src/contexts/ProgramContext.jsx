import { createContext, useState } from "react";

export const ProgramContext = createContext();
const ProgramProvider = (props) => {

const [programs, setPrograms] = useState(null);
const [singleProgram, setSingleProgram] = useState(null);
const [categories, setCategories] = useState(null);
const [episodes, setEpisodes] = useState(null);

const getAllPrograms = async () => {
  let programs = await fetch("/api/v1/programs");
  programs = await programs.json();
  setPrograms(programs);
};

const getAllProgramsByChannel = async (channelId) => {
  let programs = await fetch(`/api/v1/programs/channel/${channelId}`);
    programs = await programs.json();
    setPrograms(programs);
};

const getAllCategories = async () => {
  let categories = await fetch("/api/v1/categories");
  categories = await categories.json();
  setCategories(categories);
};

const getProgramsByCategory = async (categoryId) => {
  let programs = await fetch(`/api/v1/categories/${categoryId}`);
  programs = await programs.json();
  setPrograms(programs);
};

const getProgramById = async (programId) => {
  let program = await fetch(`/api/v1/programs/${programId}`);
  program = await program.json();
  setSingleProgram(program);
};

const getProgramEpisodes = async (programId) => {
  let episodes = await fetch(`/api/v1/programs/episodes/${programId}`);
  episodes = await episodes.json();
  setEpisodes(episodes);
}

const sortPrograms = ( a, b ) => {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

if (programs) 
{programs.sort(sortPrograms)}


const checkEnding = (string) => {
  let trimmedString = string.trim();

  if(trimmedString.endsWith('.') || trimmedString.endsWith('?') || trimmedString.endsWith('!') || trimmedString.endsWith(':')){
    return trimmedString
  } 
  else {
    return trimmedString + '.'
  }
};

const sliceContent = (text, no_words) => {
  if(text.length > 100){
    let slicedText = text.split(" ").splice(0, no_words).join(" ");

    if(slicedText.endsWith('.')||slicedText.endsWith('!')||slicedText.endsWith('?')){
      return slicedText.trim() + '..'
    }
    if(slicedText.endsWith(',') || slicedText.endsWith('-')){
      return slicedText.slice(0, -1).trim() + '...'
    }
    else{
      return slicedText.trim() + '...'
    }
  } 
  else {
    return text
  }
};


const values = {
  programs,
  getAllPrograms,
  getAllProgramsByChannel,
  singleProgram,
  categories,
  getAllCategories,
  getProgramsByCategory,
  getProgramById,
  episodes,
  getProgramEpisodes,
  checkEnding,
  sliceContent
};

return (
  <ProgramContext.Provider value={values}>
    {props.children}
  </ProgramContext.Provider>
);
}

export default ProgramProvider;