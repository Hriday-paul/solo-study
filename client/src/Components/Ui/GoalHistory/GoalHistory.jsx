import { useContext, useEffect, useReducer } from "react"
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic"
import { AuthContext } from "../../../ContextHandler/Authonicate/Authonicate"


const initialState = {
    loading: true,
    goals: [],
    error: ''
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                goals: action?.data,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                goals: [],
                error: 'Something wents wrong'
            }
        default:
            return currentState
    }
}

const GoalHistory = () => {
    const [states, dispatch] = useReducer(reducer, initialState);
    const axiosPublic = UseAxiosPublic();
    const {userInfo} = useContext(AuthContext);

    const fetchData = () => {
        axiosPublic.get(`/allGoal?email=${'hridoychandrapaul.10@gmail.com'}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <div>
            <div>
                {
                    states.loading ? 'loading...' : states.error ? 'error' :
                        <div>
                            {
                                states?.goals?.length < 0 ? 'Do data' :
                                    <div className="overflow-x-auto bg-transparent">
                                        <table className="table">
                                            {/* head */}
                                            <thead>
                                                <tr className="border-[#494846]"> 
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* row 1 */}
                                                {
                                                    states.goals?.map((goal) => {
                                                        return <tr key={goal?._id} className="border-[#494846]">
                                                            
                                                            <td className="font-serif">
                                                                {goal?.name}
                                                            </td>
                                                           
                                                            <td>
                                                                {goal?.date}
                                                            </td>
                                                            <td>
                                                                {goal?.status}
                                                            </td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default GoalHistory;