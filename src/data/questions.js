import { wordQuestions } from "./wordQuestions";
import { excelQuestions } from "./excelQuestions";
import { pptQuestions } from "./pptQuestions";

const questions = [...wordQuestions, ...excelQuestions, ...pptQuestions];

export default questions;
