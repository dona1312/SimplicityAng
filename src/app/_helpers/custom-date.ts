export class CustomDate {

	public static parseDate(date : any): any {
		return { 
            year: (new Date(date)).getFullYear(), 
            month: (new Date(date)).getMonth()+1, 
            day: (new Date(date)).getDate() };
    }

    public static parseDateFromJSON(date : any): any {
		return (date.year + '-' +
        date.month + '-' +
        date.day + 'T00:00:00.000');
    }

}
