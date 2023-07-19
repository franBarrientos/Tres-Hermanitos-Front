import { Subject } from "rxjs";

export class SubscribeManagerRx {

    private  subject = new Subject();

    public get getSubject(){
        return this.subject.asObservable();
    }

    public setSubject(value:[string, boolean]){
        this.subject.next(value)
    }


}

