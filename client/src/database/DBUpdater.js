
//File for deletion, insertion of accidents
export function  removeAccident (id)
{
    console.log("Removing accident w/ id = " + id);
}

export  function insertAccident(accidentObj, type)
{
    console.log("Inserting this:");
    console.log(accidentObj);
    console.log("Type =" + type)
}

export function insertComment(accidentId, comment )
{
    console.log("Inserted comment on id "+ accidentId);
    console.log(comment);
}
