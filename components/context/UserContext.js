import React, { 
    createContext, 
    useState, 
    useEffect 
} from "react";
import { getUserInfo, getCampigns, getCampignDetails } from "../../db/Repository";
export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [campaign, setCampaign] = useState(null);
    const [currentCampaign, setCurrentCampaign] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(()=> {
        if(token) {
            getUserInfo()
            .then(res => {
                setUser(
                    {
                        fname: res.fname,
                        lname: res.lname, 
                        img: res.img,
                        email: res.email,
                        campaign: res.campaign,
                        position: res.position

                    }
                )
            })
            .catch(err => {
                console.log(err)
            })
        }
      }, [token])

    useEffect(() => {
        if(user && token) {
            let campaignId = []
            let campaignRelationship = []
            getCampigns()
            .then(res => {
                if(res.length === 0) {
                    setCampaign(false)
                } else {
                    res.map(obj => {
                        campaignRelationship.push(obj)
                        campaignId.push(obj.campaign_id)
                    });
                    getCampignDetails(campaignId)
                    .then(res => {
                        const mergedArray = (arr1, arr2) => {
                            let newArray = []
                            arr1.map((obj) => {
                                arr2.map((obj2) => {
                                    if(obj.id === obj2.campaign_id) {
                                        obj.position = obj2.position
                                        newArray.push(obj)
                                    } 
                                })
                            })
                            return newArray
                        }
                        setCampaign(mergedArray(res, campaignRelationship))
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [user && token])

    useEffect(() => {
        if(campaign && user) {
            console.log(campaign)
            const getCurrentCampaign = campaign.findIndex(obj => obj.id = user.campaign);
            setCurrentCampaign(campaign[getCurrentCampaign])
        }
    }, [campaign, user])

    return (
        <UserContext.Provider value={
            {
                user,
                setUser,
                token,
                setToken,
                campaign,
                setCampaign,
                currentCampaign,
                setCurrentCampaign
            }
        }>
            {children}
        </UserContext.Provider>
    )

}