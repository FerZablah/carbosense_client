import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import UserModal from "./UserModal";
import UserCard from "./UserCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import RecipeAdministrationDelete from "./RecipeAdministrationDelete";
import RecipeAdministrationPage from "./RecipeAdministrationPage";
import RecipeAdministrationCard from "./RecipeAdministrationCard";

const RecipeAdministration = () => {
  let navigate = useNavigate();
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const getRecipes = useCallback(async () => {
    const response = await axios.get(`${BASE_URL}/recipe`);
    setRecipes(response.data);
  }, []);

  const deleteRecipe = useCallback(async () => {
    await axios.delete(`${BASE_URL}/recipe/${recipeToDelete.id}`);
    toast.success("Receta eliminada con éxito");
    getRecipes();
  }, [getRecipes, recipeToDelete]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active="/">Administración de Recetas</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-4">

        <RecipeAdministrationDelete
          show={showDeleteModal}
          recipe={(recipeToDelete && recipeToDelete.id) || ""}
          onHide={() => setShowDeleteModal(false)}
          onDeleteSubmit={deleteRecipe}
          title="Eliminar receta"
        />

        <Row>
          <Col className=" ms-3 fw-bold fs-1 text-start">
            Administración de Recetas
          </Col>
          <Col className=" me-3 col-4 d-flex align-items-center justify-content-end">
            <button
              onClick={() => navigate(`/agregarReceta`)}
              type="button"
              className="btn btn-secondary text-white "
            >
              Agregar receta
            </button>
          </Col>
        </Row>
        <Row>
          {
            recipes.map((recipe) => (
              <Col md={3} key={recipe.id}>
                <RecipeAdministrationCard
                  recipe={recipe}
                  onEditClicked={() => navigate(`/editarReceta/${recipe.id}`)}
                  onDeleteClicked={() => {
                    setShowDeleteModal(true);
                    setRecipeToDelete(recipe);
                  }}
                />
              </Col>
            ))

          }

        </Row>
      </div>
    </div>
  );
};

export default RecipeAdministration;
