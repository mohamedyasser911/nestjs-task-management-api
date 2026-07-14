
export class ApiFeature {
    constructor(private mongoQuery: any, private searchQuery: any) {}

    search() {
        if(this.searchQuery.search){
            const searchRegex = { $regex: this.searchQuery.search, $options: "i" };
           
            this.mongoQuery = this.mongoQuery.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex }
                ]
            });
        }
        return this;
    }
     pagination() {
        const page = parseInt(this.searchQuery.page) || 1;
        const limit = parseInt(this.searchQuery.limit) || 2;
        const skip = (page - 1) * limit;
       
       this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

        return this;

    }

    get query() {
        return this.mongoQuery;
    }
    
    



}