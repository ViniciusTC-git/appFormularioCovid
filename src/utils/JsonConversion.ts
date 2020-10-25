export class JsonConversion{
    static convertModelToJson(model:any){
        return JSON.parse(JSON.stringify(model));    
    }
}