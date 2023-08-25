const answer = "\n\n1. What documents should you always carry while driving?\nA. Your original driving license and vehicle registration certificate\nB. Your insurance certificate and road tax token\nAnswer: A. Your original driving license and vehicle registration certificate\n\n2. What should you do when you see a red traffic light or the Policeman signals you to stop?\nA. Obey the traffic signals and stop before the STOP line\nB. Accelerate and drive past the STOP line\nAnswer: A. Obey the traffic signals and stop before the STOP line\n\n3. What should you do when using your cell phone while driving?\nA. Move to the left, halt and then take the call\nB. Keep driving and take the call\nAnswer: A. Move to the left, halt and then take the call\n\n4. What should you do to minimize the risk of an accident?\nA. Make sure you are fit to drive and avoid long journeys between midnight and early morning hours\nB. Take a short nap or drink two cups of strong coffee\nAnswer: A. Make sure you are fit to drive and avoid long journeys between midnight and early morning hours\n\n5. What should you do when carrying children in cars?\nA."
let modifiedAnswer = answer.replace(/\n/g, '');
console.log(modifiedAnswer);
export const formatAsQuestions = async (inputText) => {
    // const inputText = answer; // Your input text
    console.log(modifiedAnswer);
    // Split the input text into individual questions
    const questions = inputText.split(/\d+\.\s+/).filter(Boolean);
    console.log("questions", questions);
    // Create an array of objects for each question

    const questionsArray = questions.map((question) => {
        const lines = question.trim().split('\n');
        // const qNumber = lines.shift();
        const qText = lines.shift();
        const options = {};
        console.log("lines", lines)

        if (lines.length > 1) {

            lines.slice(0, -1).forEach((line) => {
                const match = line.match(/([A-D])\.\s(.+)/);
                if (match) {
                    const optionKey = match[1].toLowerCase();
                    const optionValue = match[2];
                    options[optionKey] = optionValue;
                }
            });
            const answer = lines[lines.length - 1].match(/Answer:\s([A-D])\.\s(.+)/)[1].toLowerCase();
            if (answer) {
                return {
                    question: qText,
                    ...options,
                    answer
                    ,
                };
            }

        }
    });
    return questionsArray.filter(questions => questions);
}

// console.log("final", final);

