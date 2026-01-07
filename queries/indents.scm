; Increase indentation one level when you see opening paranthesis
(column_definitions) @indent.begin 

(column_definitions ")" @indent.branch)

; End indentation when you see closing paranthesis
")" @indent.dedent
