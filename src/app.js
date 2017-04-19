import path from "path"
import fs from "fs"
import gm from "gm"
import {ipcRenderer} from "electron"

class ImgCrop {
    constructor(TagId){
        this.el_id = TagId
        this.el = null
        this.canvas = null
        this.input_path = null
        this.output_path = null
        this.img_list = []
        this.index = 0
        this.staticRectWidth = 15
        this.staticRectHeight = 40
        this.rectWidth = this.staticRectWidth
        this.rectHeight = this.staticRectHeight
        this.rectScale = 1
        this.rectInc = 1.05
        this.rectDec = 0.95
        this.pointX = 0
        this.pointY = 0
        this.canCrop = false
        this.getElement()
    }
    getElement(){
        this.el = document.getElementById(this.el_id)
        this.canvas = document.getElementById("canvas")
        this.el.addEventListener("load", () => {
            this.canvas.width = this.el.clientWidth
            this.canvas.height = this.el.clientHeight
        })
        this.canvas.addEventListener("contextmenu", (event) => {
            [this.rectWidth, this.rectHeight, this.staticRectWidth, this.staticRectHeight] = [this.rectHeight, this.rectWidth, this.staticRectHeight, this.staticRectWidth]
            this.drawRect()
        })
        this.canvas.addEventListener("click", (event) => {
            this.pointX = event.offsetX
            this.pointY = event.offsetY
            this.canCrop = true
            this.drawRect()
        })
    }
    getFiles(){
        const img_list = fs.readdirSync(this.input_path)
        this.img_list = img_list.filter((img) => {
            if(img.match(/\.png|\.jpg$/)){
                return img
            }         
        })
        if(this.img_list.length != 0){
            this.changeImg()
        }else{
            this.canCrop = false
        }
    }
    jumpTo(){
        const pic_id = document.getElementById("pic-id").value
        if(pic_id > 0 && pic_id <= this.img_list.length){
            this.index = pic_id - 1
            this.changeImg()
        }
        
    }
    changeImg(){
        this.canCrop = false
        this.el.src = path.join(this.input_path,this.img_list[this.index])
        document.getElementById("pic-id").value = this.index + 1
    }
    setInputPath(){
        const receive = ipcRenderer.sendSync("select-input", null)
        if(receive){
            this.input_path = receive
            document.getElementById("input-path").innerHTML = this.input_path
            this.getFiles()
        }
    }
    setOutputPath(){
        const receive = ipcRenderer.sendSync("select-output", null)
        if(receive){
            this.output_path = receive
            document.getElementById("output-path").innerHTML = this.output_path
        }
    }
    drawRect(){
        let ctx = this.canvas.getContext("2d")
        let offsetX = this.pointX - this.rectWidth / 2 
        let offsetY = this.pointY - this.rectHeight / 2
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = "#FF0000"

        if(offsetX < 0){
            offsetX = 0
        }else if(offsetX + this.rectWidth > this.el.clientWidth){
            offsetX = this.el.clientWidth - this.rectWidth
        }

        if(offsetY < 0){
            offsetY = 0
        }else if(offsetY + this.rectHeight > this.el.clientHeight){
            offsetY = this.el.clientHeight - this.rectHeight
        }     
        ctx.strokeRect(offsetX, offsetY, this.rectWidth, this.rectHeight)   
    }
    increase(){
        const tempRectScale = this.rectScale * this.rectInc   
        const isMaxWidth = this.staticRectWidth * tempRectScale > this.el.clientWidth
        const isMaxHeight = this.staticRectHeight * tempRectScale > this.el.clientHeight
        if(!isMaxWidth && !isMaxHeight){
            this.rectScale *= this.rectInc
            this.rectWidth = this.staticRectWidth * this.rectScale
            this.rectHeight = this.staticRectHeight * this.rectScale
            this.drawRect()
        }
    }
    decrease(){
        this.rectScale *= this.rectDec
        this.rectWidth = this.staticRectWidth * this.rectScale
        this.rectHeight = this.staticRectHeight * this.rectScale
        this.drawRect()
    }
    prev(){
        this.index = this.index - 1
        if(this.index < 0){
            this.index = this.img_list.length - 1
        }
        this.changeImg()
    }
    next(){
        this.index = this.index + 1
        if(this.index > this.img_list.length - 1){
            this.index = 0
        }
        this.changeImg()
    }
    crop(){
        if(!this.canCrop || !this.input_path || !this.output_path ) return false;
        const input = path.join(this.input_path,this.img_list[this.index])
        const output = path.join(this.output_path,new Date().getTime().toString()+".png"/*this.img_list[this.index]*/)
        const g = gm(input)
        .crop(this.rectWidth,this.rectHeight,this.pointX - this.rectWidth / 2 ,this.pointY - this.rectHeight / 2)
        .stream( function(err, stdout, stderr) {
            var writeStream = fs.createWriteStream(output, {
                encoding: 'base64'
            });
            stdout.pipe(writeStream)
        })
        
    }
}

document.onmousedown = false
let ImgCropObj = new ImgCrop("img")

module.exports = {
    input: () => ImgCropObj.setInputPath(),
    output: () => ImgCropObj.setOutputPath(),
    jump: () => ImgCropObj.jumpTo(),
    crop: () => ImgCropObj.crop(),
    increase: () => ImgCropObj.increase(),
    decrease: () => ImgCropObj.decrease(),
    prev: () => ImgCropObj.prev(),
    next: () => ImgCropObj.next()
}


