export interface TicketModel {
  id: string;
  result: "change" | "problem" | "incident";
  problemProb: number;
  changeProb: number;
  reqProb: number;
  date: Date;
  subject: string;
}
