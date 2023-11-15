import s from "./Alfabetic.module.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderApiDogs, orderDbDogs } from "../../../redux/actions";

export default function Alfabetic({ aux }) {
  const apiDogs = useSelector((state) => state.apiDogs);
  const dbDogs = useSelector((state) => state.dbDogs);
  const dispatch = useDispatch();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("asc-name");

  const dogs = aux === "api" ? apiDogs : dbDogs;

  useEffect(() => {

  }, [aux === "api" ? apiDogs : dbDogs])

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOptionsOpen(false);
    handleFilter(option);
  };

  function handleFilter(selectedOption){
    const [type, criterio] = selectedOption.split("-");
    const dogsCopy = [...dogs]
    console.log("type y criterio --->", type, criterio)
    const sortedDogs = dogsCopy.sort((a, b) => {
      if (criterio === "name") {
        return type === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (criterio === "weight") {
        const parseWeight = (weight) => {
          const [min, max] = weight.split(" - ").map((val) => parseFloat(val));
          return (min + max) / 2;
        };
        const weightA = parseWeight(a.weight.metric);
        const weightB = parseWeight(b.weight.metric);
        return type === "asc" ? weightA - weightB : weightB - weightA;
      }
  });
  console.log("perros sorteados -->", sortedDogs)


    if (aux === "api") {
      dispatch(orderApiDogs(sortedDogs));
    } else {
      dispatch(orderDbDogs(sortedDogs));
    }
  };

  // useEffect(() => {
  //   handleFilter(selectedOption)
  // }, [apiDogs, dbDogs, selectedOption])

  return (
    <div className="dropdown">
      <button onClick={() => setOptionsOpen(!optionsOpen)}>
        Ordenar por: {selectedOption.split("-")[1]}
      </button>
      {optionsOpen && (
        <ul className="options-list">
          <li onClick={() => handleOptionClick("asc-name")}>Ascendente por Nombre</li>
          <li onClick={() => handleOptionClick("desc-name")}>Descendente por Nombre</li>
          <li onClick={() => handleOptionClick("asc-weight")}>Ascendente por Peso</li>
          <li onClick={() => handleOptionClick("desc-weight")}>Descendente por Peso</li>
        </ul>
      )}
    </div>
  );
}