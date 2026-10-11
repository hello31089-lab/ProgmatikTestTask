const calculateExp = (strArr) => {
  if (!strArr || strArr.length === 0) return 0;

  let result = 0;
  let currentOp = "+";

  for (let i = 0; i < strArr.length; i++) {
    const token = strArr[i];

    if (token === "+" || token === "-") {
      if (token === "-") {
        currentOp = currentOp === "+" ? "-" : "+";
      }
    } 
	
    else {
      const num = Number(token);

      if (currentOp === "+") {
        result += num;
      } else if (currentOp === "-") {
        result -= num;
      }

      currentOp = "+";
    }
  }

  return result;
};

function solution(res, how) {
  for (let i = 0; i < 3^9; i++) {
    const actionsNum = i.toString(3).padStart(10, "0");
    let index = 0;
    const resArr = [];
	let lastNumber = 9;
	[...actionsNum].forEach((t,i)=>{
		if(lastNumber<-1) throw new Error("No solution")
		if(t==="0") {
		i===0 ? resArr.push(lastNumber) :
			resArr[index]=([resArr[index],--lastNumber].join(""))
		}
		else {
			resArr.push(t === "1" ? "+" : "-")
			i!==0 && --lastNumber;
			resArr.push(lastNumber);
			index=resArr.length-1;
			}
	});

	
		if(!how) {
			try {
				const expression = resArr.join("")
				if(eval(expression)===res) 
					return `${expression}=${res}`;
			} catch (e){
				console.log("eval error:", e)
			;}
		} else {
			if(calculateExp(resArr)===res) return `${resArr.join("")}=${res}`;
		}
};
}
const start= performance.now();
const result = solution(200,1);
const end = performance.now();
console.log(result);

console.log(`Время выполнения: ${end - start} мс`);

