'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';


interface Question {
    number: number;
    text: string;
    options: Record<string, string>;
  }
  
  interface Section {
    title: string;
    content: string;
    verses: string[];
    questions: Question[];
  }
  
  interface QuizData {
    sections: Section[];
  }
  
  interface SubmitArgs {
    userId: string;
    fullName: string;
    respon_1: string;
    respon_2: string;
    respon_3: string;
    respon_4: string;
    respon_5: string;
    respon_6: string;
    respon_7: string;
    respon_8: string;
    respon_9: string;
    respon_10: string;
    respon_11: string;
    respon_12: string;
    respon_13: string;
    respon_14: string;
    respon_15: string;
    respon_16: string;
    respon_17: string;
    respon_18: string;
    respon_19: string;
    respon_20: string;
    respon_21: string;
    respon_22: string;
    respon_23: string;
    respon_24: string;
    respon_25: string;
    respon_26: string;
    respon_27: string;
    respon_28: string;
  }
  
  interface QuizProps {
    userId: string | null;
    fullName: string | null;
}

  const Quiz: React.FC<QuizProps> = ({ userId, fullName }) => {
    const router = useRouter();
    const sectionRef = useRef<HTMLDivElement>(null);

    const [quiz, setQuiz] = useState<QuizData | null>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    useEffect(() => {
        fetch('/quiz.json')
            .then(res => res.json())
            .then(data => setQuiz(data));
    }, []);

    const handleAnswerChange = (questionNumber: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionNumber]: answer
        }));
    };

    const areAllQuestionsAnswered = () => {
        const currentQuestions = quiz?.sections[currentSection].questions || [];
        return currentQuestions.every(q => answers[q.number]);
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div className="container py-5">
            {/* Progress indicator */}
            <div className="mb-4">
                <div className="progress" style={{ height: '2px' }}>
                    <div 
                        className="progress-bar bg-primary" 
                        style={{ width: `${((currentSection + 1) / quiz.sections.length) * 100}%` }}
                    />
                </div>
                <div className="text-end text-muted small">
                    Part {currentSection + 1} of {quiz.sections.length}
                </div>
            </div>

            {/* Current Section Content */}
            <div className="card shadow-lg border-0 rounded-3 mb-4" ref={sectionRef}>
                <div className="card-body p-4">
                    <h2 className="card-title text-primary mb-4">{quiz.sections[currentSection].title}</h2>
                    <p className="lead mb-4">
                        {quiz.sections[currentSection].content.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                {index < quiz.sections[currentSection].content.split('\n').length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                    
                    {/* Verses */}
                    <div className="bg-light p-3 rounded-3 mb-4">
                        {quiz.sections[currentSection].verses.map((verse, index) => (
                            <p key={index} className="fst-italic mb-2 text-secondary">{verse}</p>
                        ))}
                    </div>
                </div>
                
                <div className="card-body p-4">
                    {/* Questions */}
                    {quiz.sections[currentSection].questions.map((question) => (
                        <div className="mb-4 p-3 border rounded-3 bg-light" key={question.number}>
                            <p className="fw-bold mb-3">Question {question.number}: {question.text}</p>
                            <div className="ms-2">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <div className="form-check mb-2" key={key}>
                                        <input 
                                            className="form-check-input"
                                            type="radio" 
                                            name={`question-${question.number}`} 
                                            id={`${question.number}-${key}`}
                                            checked={answers[question.number] === key}
                                            onChange={() => handleAnswerChange(question.number, key)}
                                        />
                                        <label 
                                            className="form-check-label user-select-none" 
                                            htmlFor={`${question.number}-${key}`}
                                        >
                                            {value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between">
                {currentSection > 0 ? (
                    <button 
                        className="btn btn-outline-primary px-4"
                        onClick={() => setCurrentSection(currentSection - 1)} 
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Previous
                    </button>
                ) : <div></div>}

                {currentSection < quiz.sections.length - 1 ? (
                    <button 
                        className="btn btn-primary px-4"
                        onClick={() => {
                            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                            setCurrentSection(currentSection + 1);
                        }}
                        disabled={!areAllQuestionsAnswered()}
                    >
                        Next
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                ) : (
                    <button 
                        className="btn btn-success px-4"
                        onClick={() => {
                            const isConfirmed = window.confirm("Are you sure you want to submit your answers?");
                            if (isConfirmed) {
                                // Construct the request body
                                const requestBody: SubmitArgs = {
                                    userId: userId || '',
                                    fullName: fullName || '',
                                    respon_1: answers[1] || '',
                                    respon_2: answers[2] || '',
                                    respon_3: answers[3] || '',
                                    respon_4: answers[4] || '',
                                    respon_5: answers[5] || '',
                                    respon_6: answers[6] || '',
                                    respon_7: answers[7] || '',
                                    respon_8: answers[8] || '',
                                    respon_9: answers[9] || '',
                                    respon_10: answers[10] || '',
                                    respon_11: answers[11] || '',
                                    respon_12: answers[12] || '',
                                    respon_13: answers[13] || '',
                                    respon_14: answers[14] || '',
                                    respon_15: answers[15] || '',
                                    respon_16: answers[16] || '',
                                    respon_17: answers[17] || '',
                                    respon_18: answers[18] || '',
                                    respon_19: answers[19] || '',
                                    respon_20: answers[20] || '',
                                    respon_21: answers[21] || '',
                                    respon_22: answers[22] || '',
                                    respon_23: answers[23] || '',
                                    respon_24: answers[24] || '',
                                    respon_25: answers[25] || '',
                                    respon_26: answers[26] || '',
                                    respon_27: answers[27] || '',
                                    respon_28: answers[28] || '',
                                };

                                console.log(requestBody);

                                fetch(`/api/submit/${userId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({"SubmitArgs": requestBody}), // Send the constructed request body
                                })
                                .then(response => {
                                    if (response.ok) {
                                        // Redirect to home page with query parameters
                                        router.push(`/?user-id=${userId}&fullname=${fullName}`);
                                    } else {
                                        // Handle submission error
                                        console.error("Submission failed.");
                                    }
                                })
                                .catch(error => {
                                    console.error("Error submitting:", error);
                                });
                            }
                        }}
                        disabled={!areAllQuestionsAnswered()}
                    >
                        Submit Quiz
                        <i className="bi bi-check2-circle ms-2"></i>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Quiz;
