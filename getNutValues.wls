#!/usr/bin/wolframscript -username bcburnett@gmail.com -password peachpie01 
(* ::Package:: *)

argv = Rest @ $ScriptCommandLine;
argc = Length @ argv;
query = argv

data = <|"data" -> <| "calories" -> ToString@SemanticInterpretation[StringJoin[query, " calories"]],
 "weight" -> ToString@SemanticInterpretation[StringJoin["weight ",query, " in grams"]]
 |>|>

jsondata = ExportString[data, "RawJSON", "Compact" -> True]
Print[jsondata]

Exit[0]
