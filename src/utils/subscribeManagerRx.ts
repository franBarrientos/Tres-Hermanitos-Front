import { Subject } from "rxjs";

export class SubscribeManagerRx<T> {
  private subject = new Subject<T>();

  public get getSubject() {
    return this.subject.asObservable();
  }

  public setSubject(value: T) {
    this.subject.next(value);
  }
}
