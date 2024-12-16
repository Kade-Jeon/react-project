export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 객체 저장소 생성 (필요하면 추가로 정의)
      if (!db.objectStoreNames.contains("store")) {
        db.createObjectStore("store", { keyPath: "id", autoIncrement: true });
        console.log("Object store 'store' created.");
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result); // 성공하면 DB 객체를 반환
    };

    request.onerror = (event) => {
      reject(new Error("Error opening database: " + event.target.error));
    };
  });
};


export const getAllData = async () => {
  try {
    const db = await openDatabase("myDababase", 1); // DB 열기
    const transaction = db.transaction("store", "readonly"); // 트랜잭션 시작
    const objectStore = transaction.objectStore("store"); // 객체 저장소 가져오기
    const getAllRequest = objectStore.getAll(); // 모든 데이터 가져오기

    return new Promise((resolve, reject) => {
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result); // 모든 데이터를 반환
      };

      getAllRequest.onerror = (event) => {
        console.error("Error reading data:", event.target.error); // 오류 로그
        reject(new Error("Error reading data: " + event.target.error));
      };
    });
  } catch (error) {
    console.error("Error in getAllData:", error);
  }
};

export const saveData = async (data) => {
  try {
    // 데이터베이스 열기
    const db = await openDatabase("myDatabse", 1, "store");

    // 트랜잭션 시작
    const transaction = db.transaction("store", "readwrite");
    const objectStore = transaction.objectStore("store");

    // 데이터 저장
    const addRequest = objectStore.add(data);

    return new Promise((resolve, reject) => {
      addRequest.onsuccess = () => {
        resolve("Data saved successfully!"); // 저장 성공 시 메시지
      };

      addRequest.onerror = (event) => {
        reject(new Error("Error saving data: " + event.target.error)); // 저장 실패 시 메시지
      };
    });
  } catch (error) {
    console.error("Error in saveData:", error);
  }
};

// 특정 ID의 데이터를 수정하는 함수
export const updateDataById = async (input) => {
  const data = {
    ...input,
    id: Number(input.id),
  }
  try {
    // 데이터베이스 열기
    const db = await openDatabase("myDatabase", 1); // DB 이름과 버전
    const transaction = db.transaction("store", "readwrite"); // 읽기/쓰기 트랜잭션
    const objectStore = transaction.objectStore("store"); // 객체 저장소 가져오기

    // getRequest를 Promise로 감싸서 반환
    const getDataById = (id) => {
      return new Promise((resolve, reject) => {
        const getRequest = objectStore.get(id);

        getRequest.onsuccess = () => resolve(getRequest.result);
        getRequest.onerror = (event) => reject(new Error("Error fetching data: " + event.target.error));
      });
    };

    // updateRequest를 Promise로 감싸서 반환
    const updateData = (updatedData) => {
      return new Promise((resolve, reject) => {
        const updateRequest = objectStore.put(updatedData);

        updateRequest.onsuccess = () => resolve(updatedData);
        updateRequest.onerror = (event) => reject(new Error("Error updating data: " + event.target.error));
      });
    };

    // 데이터를 가져오고 업데이트 작업을 순차적으로 처리
    const existingData = await getDataById(data.id);
    if (existingData) {
      const result = await updateData(data);
      console.log("Data successfully updated:", result);
      return result;
    } else {
      throw new Error(`Data with ID ${data.id} not found.`);
    }
  } catch (error) {
    console.error("Error in updateDataById:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
  }
};

// 특정 ID의 데이터를 삭제하는 함수
export const deleteDataById = async (id) => {
  try {
    // 데이터베이스 열기
    const db = await openDatabase("myDatabase", 1); // DB 이름과 버전
    const transaction = db.transaction("store", "readwrite"); // 읽기/쓰기 트랜잭션
    const objectStore = transaction.objectStore("store"); // 객체 저장소 가져오기

    return new Promise((resolve, reject) => {
      // 특정 ID로 데이터 삭제
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        console.log(`Data with ID ${id} successfully deleted.`);
        resolve(`Data with ID ${id} successfully deleted.`);
      };

      deleteRequest.onerror = (event) => {
        reject(new Error("Error deleting data: " + event.target.error));
      };
    });
  } catch (error) {
    console.error("Error in deleteDataById:", error);
  }
};
