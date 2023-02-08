const isAuthenticatedGuard= async(to, from, next)=>{
    return new Promise( ()=>{
        const random= Math.random()*100
        if(random>50){
            console.log('Autentificacion Correcta', random)
            next()
        }else{
            console.log('Autentificacion Incorrecta', random)
            next({name: 'pokemon-home'})
        }
    })
}

export default isAuthenticatedGuard