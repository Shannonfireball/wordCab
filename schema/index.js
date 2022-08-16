const Word = require('../model/Word');
const { oxfordReq} = require('../oxfordApi/oxfordReq');
const graphql = require('graphql');
const { GraphQLSchema,GraphQLObjectType } = graphql
const { WordType } = require('./TypeDefs/WordType');

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addWord:{
            type:WordType,
            args:{ word: {type:new graphql.GraphQLNonNull(graphql.GraphQLString)} },
            async resolve(parent,args){
                const info = await oxfordReq(args.word)
                if(!info){
                    return false
                }
                const result = await Word.create(info)
                return result
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
      Word:{
        type:WordType,
        args:{id:{type:graphql.GraphQLID}},
        resolve(parent,args){
            return Word.findById(args.id)
        }},
      Words:{
        type:new graphql.GraphQLList(WordType),
        resolve(parent,args){
            return Word.find()
        }
      }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});