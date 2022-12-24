import JoditEditor from "jodit-react";
import {useRef, useState} from "react";

const ParagraphComponent=()=>{
  const editor = useRef(null);
  const [valueEditorMain, setValueEditorMain] = useState(null);
  const handleChangeDescription = (content) => {
    setValueEditorMain(content)
  }

  return (
    <JoditEditor className="form-control boxed" ref={editor} onChange={handleChangeDescription}
                 value={""}
    />
  )
}


export default ParagraphComponent