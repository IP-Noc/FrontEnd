interface Monitor {
    _id: string;
    graphId: {
        _id: string;
        executedQuery: any;  // You can further detail this structure
        resultQuery: any;    // Same as above
    };
    apiLink: string;
    name: string;
    type: string;
    service: string;
    position: number;
}
