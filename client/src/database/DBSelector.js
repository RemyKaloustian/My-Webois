//File for selection operations in DB

export function selectAccidents ()
{
    return [
        {id:1, latitude:43.616650 , longitude: 7.075074, address:'2 rue du charisme', type:'chaussée glissante', date:'09/04/2016',
            comments:[{id:0, comment:'Yabonbanania'}, {id:1, comment:'EN france '}] 
        }, 
        {id:2, latitude:43.617551 , longitude: 7.068636, address:'5 boulevard des tétons', type:'chaussée en feu', date:'09/04/2016',
            comments:[{id:0, comment:'C plus de 6,5 trilliards'}, {id:1, comment:'de townes de nourriture'}] 
        }, 
        {id:3, latitude:43.614786 , longitude: 7.067993, address:'Avenue du testitangible', type:'chaussée au moine', date:'09/04/2016',
            comments:[{id:0, comment:'qui sont jetées '}, {id:1, comment:'ckaque annnée '}] 
        },
        
        {id:4, latitude:43.619456 , longitude: 7.08212670, address:'Impasse des tétons', type:'tétonesque', date:'09/04/2016',
            comments:[{id:0, comment:'Par les partiluiers'}, {id:1, comment:'2 nos jour, les nouvelles tecnology sont partout'}] },
        
        ];
        //43.6194559 , 7.082126799999999
}