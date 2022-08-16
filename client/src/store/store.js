import {configureStore} from "@reduxjs/toolkit"
import loadReducer from "../slice/loadWords"
import SearchTermReducer  from "../slice/searchTermSlice";


export default configureStore({
    reducer:{
       load: loadReducer,
       search:SearchTermReducer,     
    }
});