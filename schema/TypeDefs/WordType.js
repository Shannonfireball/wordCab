const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const WordType = new GraphQLObjectType({
    name:'WordType',
    fields:()=>{
        return {
        id:{ type:graphql.GraphQLID },
        word:{ type:graphql.GraphQLString },
        entries:{
            type:new graphql.GraphQLList(new GraphQLObjectType({
                name:'Entry',
                fields:()=>{
                    return{
                        partOfSpeech:{ type:graphql.GraphQLString  },
                        origin:{ type:new graphql.GraphQLList(graphql.GraphQLString) },
                        definitions:{type:new graphql.GraphQLList(graphql.GraphQLString)},
                        examples:{type:new graphql.GraphQLList(graphql.GraphQLString)}
                    }
                }
            }))
        }}
    }
});



module.exports = { WordType }