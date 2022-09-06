export const BookRate=(dowmloadCount)=>{
    var rate = Array(5).fill(0);
    let stars = parseInt(dowmloadCount/5000);
        stars = stars > 4 ? 5 : stars;
        !stars&&stars++;
        rate.fill(1,0,stars);
    return rate;
}