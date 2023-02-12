/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/collections": {
    /**
     * List all collections 
     * @description Lists all available collections with minimal data set
     */
    get: operations["listCollections"];
    /** Update an existing collection */
    put: operations["updateCollection"];
    /**
     * Create a new collection 
     * @description Create a new empty collection
     */
    post: operations["createCollection"];
  };
  "/collections/{collectionId}": {
    /**
     * Get a collection 
     * @description Get a single collection with full data by it's id
     */
    get: operations["getCollection"];
    /**
     * Delete collection 
     * @description Delete a collection by collectionId
     */
    delete: operations["deleteCollection"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    StoredEntity: {
      /** Format: int64 */
      createdAt?: number;
      /** Format: int64 */
      updatedAt?: number;
      /** Format: int64 */
      removedAt?: number;
    };
    Collection: {
      /** Format: uuid */
      collectionId: string;
      name: string;
      description?: string;
    } & components["schemas"]["StoredEntity"];
    Note: {
      /** Format: uuid */
      noteId: string;
      value: string;
      tags: (string)[];
    } & components["schemas"]["StoredEntity"];
    Error: {
      /**
       * Format: int32 
       * @example 1000
       */
      code?: number;
      /** @example Error happened while updating a collection */
      message: string;
    };
  };
  responses: {
    /** @description Successful operation */
    CollectionResponse: {
      content: {
        "application/json": components["schemas"]["Collection"];
      };
    };
    /** @description Error returned in case of Server Error */
    GeneralError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Invalid input */
    ValidationError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Method not allowed */
    MethodNotAllowedError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
    /** @description Not found */
    NotFoundError: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  listCollections: {
    /**
     * List all collections 
     * @description Lists all available collections with minimal data set
     */
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": (components["schemas"]["Collection"])[];
        };
      };
      405: components["responses"]["MethodNotAllowedError"];
      500: components["responses"]["GeneralError"];
    };
  };
  updateCollection: {
    /** Update an existing collection */
    /** @description The collection object */
    requestBody: {
      content: {
        "application/json": components["schemas"]["Collection"];
      };
    };
    responses: {
      200: components["responses"]["CollectionResponse"];
      400: components["responses"]["ValidationError"];
      404: components["responses"]["NotFoundError"];
      405: components["responses"]["MethodNotAllowedError"];
      500: components["responses"]["GeneralError"];
    };
  };
  createCollection: {
    /**
     * Create a new collection 
     * @description Create a new empty collection
     */
    /** @description Create a new pet in the store */
    requestBody: {
      content: {
        "application/json": {
          /** @example My New Collection */
          name: string;
        };
      };
    };
    responses: {
      200: components["responses"]["CollectionResponse"];
      400: components["responses"]["ValidationError"];
      405: components["responses"]["MethodNotAllowedError"];
      500: components["responses"]["GeneralError"];
    };
  };
  getCollection: {
    /**
     * Get a collection 
     * @description Get a single collection with full data by it's id
     */
    parameters: {
        /** @description ID of the collection */
      path: {
        collectionId: string;
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["Collection"];
        };
      };
      400: components["responses"]["ValidationError"];
      404: components["responses"]["NotFoundError"];
      405: components["responses"]["MethodNotAllowedError"];
      500: components["responses"]["GeneralError"];
    };
  };
  deleteCollection: {
    /**
     * Delete collection 
     * @description Delete a collection by collectionId
     */
    parameters: {
        /** @description ID of the collection that needs to be deleted */
      path: {
        collectionId: string;
      };
    };
    responses: {
      /** @description Successful operation */
      200: never;
      /** @description Invalid ID supplied */
      400: never;
      404: components["responses"]["NotFoundError"];
      405: components["responses"]["MethodNotAllowedError"];
      500: components["responses"]["GeneralError"];
    };
  };
}
