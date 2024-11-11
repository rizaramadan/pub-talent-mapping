// components/PersonalityResult.tsx
'use client'

import React, { useEffect, useState } from 'react';

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

// Add new interface for personality info
interface PersonalityInfo {
    type: string;
    role_description: string[];
    extended_role_description: string[];
    example_roles: string[];
}

export const PersonalityResult: React.FC<PersonalityResultProps> = ({ resultData }) => {
  const [personalityInfo, setPersonalityInfo] = useState<PersonalityInfo | null>(null);

  useEffect(() => {
    const fetchPersonalityInfo = async () => {
      try {
        const response = await fetch(`/info/${resultData.finalResult.toLowerCase()}.json`);
        const data = await response.json();
        setPersonalityInfo(data);
      } catch (error) {
        console.error('Error fetching personality info:', error);
      }
    };

    fetchPersonalityInfo();
  }, [resultData.finalResult]);

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
        <div className="card">
            <img src={`/images/${finalResult}.png`} alt={finalResult} className="card-img-top"  /> 
            <div className="card-body">
                <h5 className="card-title">{fullName}&apos;s Personality Result</h5>
                <p className="card-text text-center" style={{ textTransform: 'uppercase' }}>{personalityRoleName}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className='row text-center'>
                        <p>Energy Expression Style</p>
                    </div>
                    <div className='row'>
                        <div className='col-4 text-end'>Outgoing</div>
                        <div className='col-4'>
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${outgoing + solitary > 0 ? (outgoing / (outgoing + solitary) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={outgoing + solitary > 0 ? (outgoing / (outgoing + solitary) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(outgoing + solitary > 0 ? (outgoing / (outgoing + solitary) * 100) : 0)}%
                                </div>
                                <div 
                                    className="progress-bar bg-danger" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${outgoing + solitary > 0 ? (solitary / (outgoing + solitary) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={outgoing + solitary > 0 ? (solitary / (outgoing + solitary) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(outgoing + solitary > 0 ? (solitary / (outgoing + solitary) * 100) : 0)}%
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>Solitary</div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='row text-center'>
                        <p>Information Gathering Style</p>
                    </div>
                    <div className='row'>
                        <div className='col-4 text-end'>Conceptual</div>
                        <div className='col-4'>
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${conceptual + practical > 0 ? (conceptual / (conceptual + practical) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={conceptual + practical > 0 ? (conceptual / (conceptual + practical) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(conceptual + practical > 0 ? (conceptual / (conceptual + practical) * 100) : 0)}%
                                </div>
                                <div 
                                    className="progress-bar bg-danger" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${conceptual + practical > 0 ? (practical / (conceptual + practical) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={conceptual + practical > 0 ? (practical / (conceptual + practical) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(conceptual + practical > 0 ? (practical / (conceptual + practical) * 100) : 0)}%
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>Practical</div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='row text-center'>
                        <p>Decision Making Style</p>
                    </div>
                    <div className='row'>
                        <div className='col-4 text-end'>Empathetic</div>
                        <div className='col-4'>
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${empathetic + logical > 0 ? (empathetic / (empathetic + logical) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={empathetic + logical > 0 ? (empathetic / (empathetic + logical) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(empathetic + logical > 0 ? (empathetic / (empathetic + logical) * 100) : 0)}%
                                </div>
                                <div 
                                    className="progress-bar bg-danger" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${empathetic + logical > 0 ? (logical / (empathetic + logical) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={empathetic + logical > 0 ? (logical / (empathetic + logical) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(empathetic + logical > 0 ? (logical / (empathetic + logical) * 100) : 0)}%
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>Logical</div>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='row text-center'>
                        <p>Task Management Style</p>
                    </div>
                    <div className='row'>
                        <div className='col-4 text-end'>Organized</div>
                        <div className='col-4'>
                            <div className="progress">
                                <div 
                                    className="progress-bar" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${organized + flexible > 0 ? (organized / (organized + flexible) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={organized + flexible > 0 ? (organized / (organized + flexible) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(organized + flexible > 0 ? (organized / (organized + flexible) * 100) : 0)}%
                                </div>
                                <div 
                                    className="progress-bar bg-danger" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${organized + flexible > 0 ? (flexible / (organized + flexible) * 100) : 0}%` 
                                    }}
                                    aria-valuenow={organized + flexible > 0 ? (flexible / (organized + flexible) * 100) : 0}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                >
                                    {Math.round(organized + flexible > 0 ? (flexible / (organized + flexible) * 100) : 0)}%
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>Flexible</div>
                    </div>
                </li>
            </ul>
            
            {/* Add personality info after the last list-group-item */}
            {personalityInfo && (
                <div className="card-body">
                    <h5 className="card-title">Role Description</h5>
                    <ul className="list-unstyled">
                        {personalityInfo.role_description.map((desc, index) => (
                            <li key={index} className="mb-2">{desc}</li>
                        ))}
                    </ul>
                   
                    <h5 className="card-title mt-4">Recommended Roles</h5>
                    <ul>
                        {personalityInfo.example_roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
  );
};


