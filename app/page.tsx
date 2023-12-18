"use client";

import React, { useState, useEffect } from "react";
import Tabela from "./Componentes/Tabela/index";
import { log } from "console";
import { data } from "autoprefixer";
const axios = require("axios").default;

function Home() {
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const urlcurso =
    "https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/curso";
  const urlDisciplina = `https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/disciplinas_por_curso/`;
  
  type Curso = {};
  type GetCursoResponse = {};

  type Disciplina = {};
  type GetDisciplinaResponse = {};

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const resposta = await fetch(urlcurso);
        if (!resposta.ok) {
          throw new Error(`Erro ao Buscar Cursos: ${resposta.statusText}`);
        }
        const cursos = await resposta.json();
        const data = cursos.data || [];
        setCursos(data);
        return data;
      } catch (error) {
        console.error(`Erro durante a requisição`, error.message);
      }
    };

    fetchCursos();
  }, []);

  function handleSelect(event:any) {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const selectedValue = selectedOption.value;

    montarTabela(selectedValue);
    
  }

async function montarTabela(id:String){  
  const url = `${urlDisciplina}${id}`
  console.log(url);
  
  try{
   const response = await fetch(`${urlDisciplina}${id}`);
    if(!response.ok){
      console.log("Erro");
      
    }
    const data = await response.json();
    setDisciplinas(data.data)
    
  }
  catch(error){
    console.log("erro ao tentar acessar as disciplinas", error);
    
  }


}
  return (
    <>
      <h1>MESTRE DETALHE: DISCIPLINA X CURSO</h1>
      <section>
        <h2>CURSOS</h2>
        <select name="cursos" id="cursos" onChange={handleSelect}>
          <option value="select" defaultValue="select">
            -- SELECT --
          </option>
          {cursos.map((curso, index) => (
            <option key={index} value={curso.id_curso}>
              {curso.tx_descricao}
            </option>
          ))}
        </select>
      </section>
      <Tabela disciplinas={disciplinas}/>
    </>
  );
}

export default Home;
