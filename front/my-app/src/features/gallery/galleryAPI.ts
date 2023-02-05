import axios from "axios";
import { MY_SERVER } from "../../env";
import { IImage } from "../../models/gallery";



export function getimages() {
  return new Promise<{ data: IImage[] }>((resolve) =>
    axios.get(MY_SERVER).then(res => resolve({ data: res.data })))

}

export function addimages(newimage :any) {

  return new Promise<{ data :  any  }>((resolve) =>

    axios.post(MY_SERVER, newimage).then(res => resolve({ data : newimage })))

}


export function delimages(id :number) {

  return new Promise<{ data :  number  }>((resolve) =>

    axios.delete(MY_SERVER + "/" + id).then(res => resolve({ data : res.data })))

}


export function updimages(updimage :any ) {
  // console.log(updimage)

  return new Promise<{ data :  any  }>((resolve) =>

    axios.put(MY_SERVER + "/" + updimage.updid , updimage.form_data).then(res => resolve({ data : updimage })))

}


