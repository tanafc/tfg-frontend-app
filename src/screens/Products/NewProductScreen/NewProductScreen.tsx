import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { NewProductScreenNavigationProps } from "../../../models/Navigation";
import { NutriScore, Nutrients } from "../../../models/Product";
import { useProduct } from "../../../hooks/useProducts";

const NewProductScreen = ({
  route,
  navigation,
}: NewProductScreenNavigationProps) => {
  const { barcode } = route.params;
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [nutrients, setNutrients] = useState<Nutrients>({
    energy: "",
    totalFat: "",
    saturatedFat: "",
    transFat: "",
    totalCarbohydrates: "",
    totalSugars: "",
    addedSugars: "",
    protein: "",
    salt: "",
    sodium: "",
    fibre: "",
    perFruitVeg: "",
    cholesterol: "",
    dVitamin: "",
    calcium: "",
    iron: "",
    potassium: "",
  });
  const [isBeverage, setIsBeverage] = useState<boolean>(false);
  const [nutriScore, setNutriScore] = useState<NutriScore>("");

  const { postProduct } = useProduct();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: number) => {
    const ingredientList = [...ingredients];
    ingredientList.splice(index, 1);

    setIngredients(ingredientList);
  };

  const handleIngredientChange = (text: string, index: number) => {
    const ingredientList = [...ingredients];
    ingredientList[index] = text;

    setIngredients(ingredientList);
  };

  const handleNutrientChange = (name: string, value: string) => {
    const nutrient = name as keyof Nutrients;
    setNutrients({ ...nutrients, [nutrient]: value });
  };

  const handleUploadProduct = async () => {
    await postProduct({
      barcode: barcode,
      name: name,
      brand: brand,
      image: "null",
      ingredients: ingredients,
      nutrients: nutrients,
      beverage: isBeverage,
      nutriScore: nutriScore,
    })
      .then((response) => {
        Alert.alert("Product uploaded yay!");
      })
      .catch((reason) => {
        console.log(reason.message);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>New Product 🌯</Text>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.labelText}>Name:</Text>
          <CustomInput
            placeholder="Super Cool Cookies"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.labelText}>Brand:</Text>
          <CustomInput
            placeholder="Cookie Company"
            value={brand}
            onChangeText={setBrand}
          />

          <Text style={styles.labelText}>Ingredients:</Text>
          <View style={styles.ingredientsContainer}>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.newIngredientContainer}>
                <View style={styles.ingredientInput}>
                  <CustomInput
                    placeholder="New ingredient"
                    value={ingredient}
                    onChangeText={(text) => handleIngredientChange(text, index)}
                  />
                </View>
                <View style={styles.ingredientRemove}>
                  {ingredients.length > 1 && (
                    <Ionicons
                      name="trash-outline"
                      size={25}
                      color="tomato"
                      onPress={() => handleRemoveIngredient(index)}
                    />
                  )}
                </View>
              </View>
            ))}
            <View style={styles.ingredientAdd}>
              <CustomButton
                text="Add new ingredient 🍅"
                onPress={handleAddIngredient}
              />
            </View>
          </View>

          <View style={styles.nutrientsContainer}>
            <Text style={styles.labelText}>Nutrients (100g) 💪:</Text>
            {Object.keys(nutrients).map((nutrient) => (
              <View key={nutrient} style={styles.nutrientRow}>
                <View style={styles.nutrientText}>
                  <Text>{nutrient}:</Text>
                </View>
                <View style={styles.nutrientInput}>
                  <CustomInput
                    placeholder="0.00"
                    value={nutrients[nutrient as keyof Nutrients] as string}
                    onChangeText={(value) =>
                      handleNutrientChange(nutrient, value)
                    }
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.beverageContainer}>
            <Text style={styles.labelText}>Is the product a beverage? 🧃:</Text>
            <Picker
              selectedValue={isBeverage}
              onValueChange={(itemValue) => setIsBeverage(itemValue)}
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
          </View>

          <View style={styles.nutriScoreContainer}>
            <Text style={styles.labelText}>What is the NutriScore? 👀:</Text>
            <Picker
              selectedValue={nutriScore}
              onValueChange={(itemValue) => setNutriScore(itemValue)}
            >
              <Picker.Item label="A: Very healthy!" value={"A"} />
              <Picker.Item label="B: Healthy" value={"B"} />
              <Picker.Item label="C: Not really healthy" value={"C"} />
              <Picker.Item label="D: Not healthy" value={"D"} />
              <Picker.Item label="E: Definetly not healthy" value={"E"} />
              <Picker.Item label="It does not say 😥" value={""} />
            </Picker>
          </View>

          <View style={styles.shareButton}>
            <CustomButton
              text="Share the new product! 🥳"
              onPress={handleUploadProduct}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDDC7",
  },

  titleView: {
    marginTop: 35,
    marginBottom: 5,
  },

  titleText: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 30,
  },

  inputView: {
    width: "70%",
  },

  buttonView: {
    width: "60%",
  },

  labelText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  ingredientsContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  newIngredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  ingredientInput: {
    minWidth: "90%",
  },

  ingredientRemove: {
    alignItems: "center",
    marginLeft: 5,
    width: "10%",
  },

  ingredientAdd: {
    alignItems: "center",
    width: "70%",
  },

  nutrientsContainer: {
    marginTop: 20,
  },

  nutrientRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  nutrientText: {
    width: "60%",
  },

  nutrientInput: {
    width: "40%",
  },

  beverageContainer: {
    marginTop: 20,
  },

  nutriScoreContainer: {
    marginTop: 20,
  },

  shareButton: {
    marginTop: 10,
    marginBottom: 30,
  },
});

export default NewProductScreen;
