// components/PersonalityResult.tsx
'use client'

import React from 'react';

export interface ResultData {
  userId: string;
  fullName: string;
  finalResult: string;
  personalityRoleName: string;
  cluster: string;
  outgoing: number;
  solitary: number;
  conceptual: number;
  practical: number;
  empathetic: number;
  logical: number;
  organized: number;
  flexible: number;
}

interface PersonalityResultProps {
  resultData: ResultData;
}

export const PersonalityResult: React.FC<PersonalityResultProps> = ({ resultData }) => {
  const {
    fullName,
    outgoing,
    solitary,
    conceptual,
    practical,
    empathetic,
    logical,
    organized,
    flexible,
    finalResult,
    personalityRoleName
  } = resultData;

  console.log(resultData);

  return (
    <div >
        <h2>{fullName}'s Personality Result</h2>
        <figure>
            <img src={`/images/${finalResult}.png`} alt={finalResult} />
        </figure>
        <h3 style={{ textTransform: 'uppercase' }}>{personalityRoleName} ({finalResult})</h3>
        
        <table>
            <tbody>
                <tr><td colSpan={3}>Energy Expression Style</td></tr>
                <tr>
                    <td> Outgoing </td>
                    <td> 
                        <input 
                            type="range" 
                            value={outgoing + solitary > 0 ? 100 - ((outgoing / (outgoing + solitary) * 100)) : 0} 
                            readOnly 
                        />  
                    </td>
                    <td> Solitary </td>
                </tr>
                <tr><td colSpan={3}>Information Gathering Style</td></tr>
                <tr>
                    <td> Conceptual </td>
                    <td>
                        <input 
                            type="range" 
                            value={conceptual + practical > 0 ? 100 - ((conceptual / (conceptual + practical) * 100)) : 0} 
                            readOnly 
                        /> 
                    </td>
                    <td> Practical </td>
                </tr>
                <tr><td colSpan={3}>Decision Making Style</td></tr>
                <tr>
                    <td> Empathetic </td>
                    <td>
                        <input 
                            type="range" 
                            value={empathetic + logical > 0 ? 100 - ((empathetic / (empathetic + logical) * 100)) : 0} 
                            readOnly 
                        /> 
                    </td>
                    <td> Logical </td>
                </tr>
                <tr><td colSpan={3}>Task Management Style</td></tr>
                <tr>
                    <td> Organized </td>
                    <td>
                        <input 
                            type="range" 
                            value={organized + flexible > 0 ? 100 - ((organized / (organized + flexible) * 100)) : 0} 
                            readOnly 
                        /> 
                    </td>
                    <td> Flexible </td>
                </tr>
            </tbody>
        </table>   
    </div>
  );
};


