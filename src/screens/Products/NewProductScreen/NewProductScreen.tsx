import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import { useProduct } from "../../../hooks/useProduct";
import { NewProductScreenNavigationProps } from "../../../models/Navigation";
import {
  MandatoryNutrients,
  NutriScore,
  NutrientUnits,
  NutrientsData,
  OptionalNutrients,
} from "../../../models/Product";

const NewProductScreen = ({
  route,
  navigation,
}: NewProductScreenNavigationProps) => {
  const { barcode } = route.params;
  const [name, setName] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [nutrients, setNutrients] = useState<NutrientsData>({
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
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean | undefined>(
    undefined
  );
  const [showOptionalNutrients, setShowOptionalNutrients] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    const nutrient = name as keyof NutrientsData;
    setNutrients({ ...nutrients, [nutrient]: value });
  };

  const handleUploadProduct = async () => {
    setLoading(true);

    const withoutEmptyIngredients = ingredients.filter(
      (ingredient) => !!ingredient
    );

    await postProduct({
      barcode: barcode,
      name: name,
      brand: brand,
      image: "null",
      ingredients: withoutEmptyIngredients,
      nutrients: nutrients,
      beverage: isBeverage,
      nutriScore: nutriScore,
    })
      .then(() => {
        setUploadSuccessful(true);
      })
      .catch((reason) => {
        setUploadSuccessful(false);
        console.log(reason.message);
      });

    setLoading(false);
    setModalVisible(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>New Product 🌯</Text>
          <Text>Barcode: {barcode}</Text>
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
            {Object.keys(MandatoryNutrients).map((nutrient) => (
              <View key={nutrient} style={styles.nutrientRow}>
                <View style={styles.nutrientText}>
                  <Text>
                    {
                      MandatoryNutrients[
                        nutrient as keyof typeof MandatoryNutrients
                      ]
                    }
                    :
                  </Text>
                </View>
                <View style={styles.nutrientInput}>
                  <CustomInput
                    placeholder="0.00"
                    value={nutrients[nutrient as keyof NutrientsData] as string}
                    onChangeText={(value) =>
                      handleNutrientChange(nutrient, value)
                    }
                  />
                </View>
                <View style={[styles.nutrientText, { marginLeft: 5 }]}>
                  <Text>
                    {NutrientUnits[nutrient as keyof typeof NutrientUnits]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.nutrientsContainer}>
            <Pressable
              onPress={() => setShowOptionalNutrients(!showOptionalNutrients)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                {showOptionalNutrients ? (
                  <Ionicons
                    name="chevron-down-circle-outline"
                    size={25}
                    color="tomato"
                  />
                ) : (
                  <Ionicons name="chevron-forward-circle-outline" size={25} />
                )}
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={[styles.labelText, { width: 200 }]}>
                    Provide additional info
                  </Text>
                  <Text style={{ width: 200 }}>Only if you know 🤔</Text>
                </View>
              </View>
            </Pressable>
            {showOptionalNutrients &&
              Object.keys(OptionalNutrients).map((nutrient) => (
                <View key={nutrient} style={styles.nutrientRow}>
                  <View style={styles.nutrientText}>
                    <Text>
                      {
                        OptionalNutrients[
                          nutrient as keyof typeof OptionalNutrients
                        ]
                      }
                      :
                    </Text>
                  </View>
                  <View style={styles.nutrientInput}>
                    <CustomInput
                      placeholder="0.00"
                      value={
                        nutrients[nutrient as keyof NutrientsData] as string
                      }
                      onChangeText={(value) =>
                        handleNutrientChange(nutrient, value)
                      }
                    />
                  </View>
                  <View style={[styles.nutrientText, { marginLeft: 5 }]}>
                    <Text>
                      {NutrientUnits[nutrient as keyof typeof NutrientUnits]}
                    </Text>
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
              mode="dropdown"
            >
              <Picker.Item label="A:   Very healthy!" value={"A"} />
              <Picker.Item label="B:   Healthy" value={"B"} />
              <Picker.Item label="C:   Not really healthy" value={"C"} />
              <Picker.Item label="D:   Not healthy" value={"D"} />
              <Picker.Item label="E:   Definetly not healthy" value={"E"} />
              <Picker.Item label="I do not see it 😥" value={""} />
            </Picker>
          </View>

          <View style={styles.shareButton}>
            <CustomButton
              text="Share the new product! 🥳"
              onPress={handleUploadProduct}
              loading={loading}
            />
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            {uploadSuccessful === true && (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Yay 🥳! The product was successfully uploaded!
                </Text>
                <View style={styles.modalButtons}>
                  <CustomButton
                    text={"That's great!"}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                </View>
              </View>
            )}
            {uploadSuccessful === false && (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Oh no! It seems there was an error...
                </Text>
                <View style={styles.modalButtons}>
                  <CustomButton
                    text={"Let me check"}
                    onPress={() => {
                      setModalVisible(false);
                      setUploadSuccessful(undefined);
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </Modal>
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
    width: "25%",
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },

  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
  },

  modalButtons: {
    marginTop: 15,
    width: "80%",
  },
});

export default NewProductScreen;
