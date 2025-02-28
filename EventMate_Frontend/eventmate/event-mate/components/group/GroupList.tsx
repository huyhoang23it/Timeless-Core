import React, { useEffect, useState } from 'react';  

// Define the interface for the group data structure  
interface Group {  
  groupId: string;  
  img: string | null;  
  groupName: string;  
  totalMember: number;  
}  

const GroupList: React.FC = () => {  
  const [groups, setGroups] = useState<Group[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {  
    const fetchGroups = async () => {  
      try {  
        const response = await fetch('https://localhost:7121/api/Group');  
        const data = await response.json();  

        if (data.status === 200) {  
          setGroups(data.data);  
        } else {  
          setError('Failed to fetch groups');  
        }  
      } catch (err) {  
        setError('An error occurred while fetching groups');  
      } finally {  
        setLoading(false);  
      }  
    };  

    fetchGroups();  
  }, []);  

  if (loading) {  
    return <div>Loading...</div>;  
  }  

  if (error) {  
    return <div>{error}</div>;  
  }  

  return (  
    <div style={{ padding: '20px' }}>  
      <h2>Group List</h2>  
      <ul style={{ listStyleType: 'none', padding: 0 }}>  
        {groups.map((group) => (  
          <li key={group.groupId} style={{ marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', display: 'flex', alignItems: 'center' }}>  
            {group.img && (  
              <img src={group.img} alt={group.groupName} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />  
            )}  
            <div>  
              <h3 style={{ margin: '0' }}>{group.groupName}</h3>  
              <p style={{ margin: '0' }}>Total Members: {group.totalMember}</p>  
            </div>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  

export default GroupList;