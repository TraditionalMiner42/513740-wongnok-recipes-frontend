import { Rate, Typography } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";

const { Text } = Typography;

const Rating = ({ menu, authUser }) => {
    const [rating, setRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                const response = await axios.get("http://localhost:4000/menu/get-rating", {
                    params: {
                        userId: authUser,
                        menuId: menu.menu_id
                    }
                });
                if (response.data.rating !== null) {
                    setRating(response.data.rating);
                    setHasRated(true);
                }
            } catch (error) {
                console.error("Error fetching rating:", error);
            }
        };

        if (authUser && menu.menu_id) {
            fetchUserRating();
        }
    }, [authUser, menu.menu_id]);

    const handleRatingSubmit = async (value) => {
        if (hasRated) return;

        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:4000/menu/create-rating", {
                rating: value,
                userId: authUser,
                menuId: menu.menu_id
            });
            setRating(value);
            setHasRated(true);
        } catch (error) {
            console.error("Error submitting rating:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (menu.user_id === authUser || !authUser || hasRated) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
                gap: 8
            }}>
            <Text>Rate this menu</Text>
            <Rate value={rating} onChange={handleRatingSubmit} disabled={isSubmitting} />
        </div>
    );
};

export default Rating;
