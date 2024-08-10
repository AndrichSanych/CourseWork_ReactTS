export class DateTime{
    private options:Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    private  date:string = ''
    private  time:string = ''
    private  fullTime:string = ''
    constructor(dateTime:string){
       const dt:string[] = dateTime.split('T'); 
       this.date = new Date(dt[0]).toLocaleDateString('uk-UA',this.options);
       this.time = dt[1].slice(0, 5);
       this.fullTime = dt[1];
    }
    get getDate():string {return this.date; }
    get getFullTime():string {return this.fullTime;} 
    get getTime():string {return this.time;} 
    get isToday():boolean {return new Date(this.date).getDate() === new Date(Date.now()).getDate();}
}