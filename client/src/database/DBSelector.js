//File for selection operations in DB

export function selectAccidents ()
{
    return [
        {id:1, latitude:43.616735 , longitude:7.074767, address:'Carrefour Saint Phillipe', type:'Piéton percuté', date:'09/04/2016',
            comments:[{id:0, comment:'Les piétons sont débiles'}, {id:1, comment:'Skaters fréquents (et qui ne regardent même pas la route) '}] 
        },         
        ];
        //43.6194559 , 7.082126799999999
}