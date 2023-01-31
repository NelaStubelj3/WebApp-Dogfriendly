import React from "react";
import reviewService from "../../services/reviewService";
import { HomeContext } from "./HomeContext";
import authService from "../../services/authService";
import { MdModeEditOutline } from "react-icons/md"
import { BiTrash } from "react-icons/bi";
import ReactStars from "react-stars"

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            writingReview: false,
            selectedStars: 1
        };
        this.lastSelectedLocationId = -1

        this.onStarChange = (selected) => {
            this.setState({selectedStars: selected})
        }

        this.submitReview = () => {
            reviewService.postReview(this.context.selectedLocation.locationId, this.state.selectedStars, this.message).then(() => {
                this.my_review = {
                    accountId: authService.getCurrentUser().accountId,
                    locationId: this.context.selectedLocation.locationId,
                    stars: this.state.selectedStars,
                    message: this.message
                }
                this.setState({writingReview: false})
                let tmp = this.context.selectedLocation
                this.context.setSelectedLocation(tmp=>({...tmp}))
            })
        }
    }


    render() {
        if(this.context.selectedLocation.locationId !== this.lastSelectedLocationId) {
            this.lastSelectedLocationId = this.context.selectedLocation.locationId

            if(this.context.selectedLocation.locationId) {
                let tmp = []
                this.my_review = undefined
                reviewService.getReviews(this.context.selectedLocation.locationId).then((res) => {
                    for(let i in res.data) {
                        if(authService.getCurrentUser() && res.data[i].accountId === authService.getCurrentUser().accountId) {
                            this.my_review = res.data[i]
                        } else {
                            tmp.push(
                                <div className="review-body" key={i}>
                                    <ReactStars
                                        count={5} 
                                        value={res.data[i].stars}
                                        size={24} 
                                        color2={'orange'} 
                                        edit={false}/>
                                    <p>{res.data[i].message}</p>
                                </div>
                            )
                        }
                    }
                    this.setState({reviews: tmp, writingReview: false})
                })
            }
        }

        return (
            <div className="sidebar-block">
                <div className='sidebar-block-title'>
                    <h3>Recenzije</h3>
                </div>
                <div className='sidebar-block-content'>
                    {!this.state.writingReview && this.my_review !== undefined && 
                        <div className="review-body">
                            <span className="edit-review-icons">
                                <BiTrash onClick={() => {
                                    reviewService.deleteReview(this.context.selectedLocation.locationId).then(() => {
                                        this.my_review = undefined
                                        this.setState({writingReview: false})
                                    })
                                }}/>
                                <MdModeEditOutline onClick={() => {
                                    this.message = this.my_review.message
                                    this.setState({writingReview: true, selectedStars: this.my_review.stars})
                                }}/>
                            </span>
                           
                            <ReactStars
                                count={5} 
                                value={this.my_review.stars}
                                size={24} 
                                color2={'orange'} 
                                edit={false}/>
                            <p name="reviewText">{this.my_review.message}</p>
                        </div>
                    }
                    {!authService.getCurrentUser() && 
                        <div className="review-body">
                            <p>Potrebno se prijaviti za pisanje recenzija</p>
                        </div>
                    }
                    {!this.state.writingReview  && authService.getCurrentUser() && this.my_review === undefined &&
                        <div className="review-location-btn review-body" onClick={() => {this.setState({writingReview: true})}}>
                            <p>Napiši recenziju</p>
                        </div>
                    }
                    {this.state.writingReview && 
                        <div className="review-body">
                             <ReactStars
                                count={5} 
                                value={this.state.selectedStars}
                                size={24} 
                                color2={'orange'} 
                                edit={true}
                                half={false}
                                onChange={this.onStarChange}/>
                            <textarea placeholder="message" 
                                      defaultValue={this.my_review ? this.my_review.message : ""} 
                                      maxLength={200} 
                                      className="message-textarea" 
                                      onChange={(event) => {this.message = event.target.value}}/>
                            <div id="submitReview" className="button" onClick={this.submitReview}>
                                <p>Spremi</p>
                            </div>
                        </div>
                    }

                    {this.state.reviews}
                </div>
            </div>
        )
    }
}
Review.contextType = HomeContext;

export default Review;