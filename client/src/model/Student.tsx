import { Gender } from "../enum/Gender";
import { Status } from "../enum/Status";

export type Student = {
  StudentId?: string;
  StudentCode?: string;
  StudentName?: string;
  Gender?: Gender;
  DateOfBirth?: string;
  Email?: string;
  PhoneNumber?: string;
  Address?: string;
  Avatar?: string;
  ClassId?: string;
  Status?: Status;
  CreatedDate?: string;
  CreatedBy?: string;
  ModifiedDate?: string;
  ModifiedBy?: string;
  ClassName?: string;
};
