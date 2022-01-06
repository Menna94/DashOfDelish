// Asynchronous mime type validator
import { AbstractControl } from "@angular/forms";
import { Observable , Observer} from "rxjs";

export const mimeType = (control:AbstractControl): 
//{ [key:string]:any } is the error code => ex: {InvalidMimeType: true}
Promise<{ [key:string]:any }> | Observable<{ [key:string]:any }> =>{ 
   //(1)--> get the value of the control
    const file = control.value as File;
    //(2)--> read the value of the control
    const fileReader = new FileReader();
    const fileReaderObservable = 
    Observable.create((observer:Observer<{ [key:string]:any }> )=>{
        fileReader.addEventListener("loadend",()=>{
            //(3)--> check the mime type of that file
            //mimeType Validation
            //8 bits array=> read certain file patterns in the file metadata
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0,4);
            let header = "";
            let isValid = false;

            for(let i=0; i<arr.length; i++){
                header += arr[i].toString(16);
            }

            switch(header){
                case "89504e47": //image/png
                    isValid= true;
                    break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8": //image/jpeg
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }

            if(isValid){
                observer.next(null) //passes the validation successfully 
            } else {
                observer.next({InvalidMimeType: true}) //never passes the validation and returns error msg
            }

            observer.complete();

        })

        fileReader.readAsArrayBuffer(file);
    })

    return fileReaderObservable;
}