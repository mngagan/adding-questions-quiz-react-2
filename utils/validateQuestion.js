export const validateQuestion =  (arg) =>{
  if(arg.name.length > 0){
    let ansLength = []
    arg.ansList.map(ans => {
      if(ans.length > 0){
        ansLength.push(ans)
      }
    })
    if(ansLength.length > 1){
      return {success : true}
    }
    return {success : false, msg : 'answer list invalid'}
  }
  return {success : false, msg : 'question invalid'}
}