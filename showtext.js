function printText(text){
    let len = text.length>5?text.length:5;
	text=text.padEnd(len);
    let string = box[0]+box[1].repeat(len)+box[2]+"\n"+
		box[3]+text+box[3]+"\n"+
        box[4]+box[1].repeat(len)+box[5]
    console.log(string)
}