import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

type MealPlan = {
  name: string;
  kinds: string[];
  types: string[];
  description: string;
  caloriesPerServing: number;
  proteinPerServing: number;
  tags: string[];
  carbsPerServing: number;
  fatPerServing: number;
  preparationMinutes: number;
  servingSize: number;
  servingSizeUnit: string;
  ingredientsPerServing: Ingredient[];
  instructions: string[];
};

type FoodCardProps = {
  meal: MealPlan;
};

export const FoodCard: React.FC<FoodCardProps> = ({ meal }) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 3 }}>
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          fontWeight="semibold"
          gutterBottom
        >
          {meal.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {meal.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Macronutrients and Serving Info */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" fontWeight="semibold">
              Calories:
            </Typography>
            <Typography variant="body1">
              {meal.caloriesPerServing} kcal
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" fontWeight="semibold">
              Protein:
            </Typography>
            <Typography variant="body1">{meal.proteinPerServing} g</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" fontWeight="semibold">
              Carbs:
            </Typography>
            <Typography variant="body1">{meal.carbsPerServing} g</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="body2" fontWeight="semibold">
              Fat:
            </Typography>
            <Typography variant="body1">{meal.fatPerServing} g</Typography>
          </Grid>
        </Grid>

        {/* Serving and Preparation */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" fontWeight="semibold">
            Preparation Time:
          </Typography>
          <Typography variant="body1">
            {meal.preparationMinutes} minutes
          </Typography>

          <Typography variant="body2" fontWeight="semibold">
            Serving Size:
          </Typography>
          <Typography variant="body1">
            {meal.servingSize} {meal.servingSizeUnit}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Tags */}
        <Box mb={3}>
          <Typography variant="body2" fontWeight="semibold" gutterBottom>
            Tags:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {meal.tags.map((tag, index) => (
              <Chip key={index} label={tag} color="primary" size="small" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Ingredients */}
        <Box mb={3}>
          <Typography variant="body2" fontWeight="semibold" gutterBottom>
            Ingredients Per Serving:
          </Typography>
          <Grid container spacing={2}>
            {meal.ingredientsPerServing.map((ingredient, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Typography variant="body2">
                  {ingredient.quantity}
                  {ingredient.unit} <strong>{ingredient.name}</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {ingredient.category}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Instructions */}
        <Box>
          <Typography variant="body2" fontWeight="semibold" gutterBottom>
            Instructions:
          </Typography>
          <List>
            {meal.instructions.map((instruction, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {index + 1}. {instruction}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
