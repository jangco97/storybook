import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useGetBookLikes, usePatchUser } from 'queries';
import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Book } from 'components/user';
import { Loader } from 'components/shared';
import CustomModal from 'components/modal/CustomModal';
import { ImageUploader } from 'components/shared';
import { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import { postImage } from 'api';
import { useUserStore } from 'store/useUserStore';
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nicknameBtn, setNicknameBtn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwalert, setPwalert] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const { user } = useUserStore();

  const userId: string = user?.id || '';

  const take = 4;
  const imageRef = useRef<ImageUploaderImperativeHandle>(null);
  const queryClient = useQueryClient();
  const { mutate, status: patchStatus, error } = usePatchUser();

  const {
    data: LikesBooks,
    status,
    isSuccess,
  } = useGetBookLikes({ userId: userId, take: take, page: currentPage });

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;

    const totalPages = Math.ceil(LikesBooks.totalPages);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  const saveProfileImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!imageSrc) {
      alert('프로필 이미지를 선택하세요.');
      return;
    }
    mutate(
      { id: userId, profileImgPath: imageSrc },
      {
        onSuccess: () => {
          alert('프로필 이미지가 성공적으로 변경되었습니다.');
          setImageId('');
          setImageSrc('');
        },
      },
    );
  };
  const saveNickName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!nickname) {
      alert('닉네임을 입력하세요.');

      return;
    }
    mutate(
      { id: userId, nickname: nickname },
      {
        onSuccess: () => {
          alert('닉네임이 성공적으로 변경되었습니다.');
          queryClient.invalidateQueries([QueryKeys.USER_DATA]);
          setNickname('');
        },
      },
    );
  };

  const patchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert('비밀번호와 비밀번호 확인을 입력하세요.');
      return;
    }
    if (password !== confirmPassword) {
      setPwalert(false);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPwalert(true);
    mutate(
      { id: userId, password: password },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          setPassword('');
          setConfirmPassword('');
        },
      },
    );
    if (error) {
      alert(error);
    }
  };

  const handleClick = (id: string) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };

  const findSelectedBook = () => {
    return LikesBooks?.books.flatMap((data) => data).find((data) => data?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();

  console.log('LikesBooks', LikesBooks);
  const postProfileImg = async (fileData: File | null) => {
    if (fileData) {
      const res = await postImage(fileData);
      //setUser로 유저 프로필 변경
      setImageId(res.imageId);
      setImageSrc(res.imagePath);
    } else {
      alert('파일이 없습니다.');
    }
  };
  return (
    <Container>
      <section>
        <div className="userTable">
          <h1 className="tbody">내정보</h1>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>프로필 이미지 변경</th>
                  <td>
                    <ImageUploader
                      ref={imageRef}
                      onChange={(fileData: File[] | null) =>
                        postProfileImg(fileData ? fileData[0] : null)
                      }
                    />
                    <ProfileImgBtnWrap>
                      <button onClick={saveProfileImg}>프로필 이미지 변경</button>
                    </ProfileImgBtnWrap>
                  </td>
                </tr>
                <tr>
                  <th>아이디(이메일)</th>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <th>닉네임</th>
                  <td>
                    <div>
                      <span>{user?.nickname ? user.nickname : nickname}</span>
                      <button type="button" onClick={() => setNicknameBtn(!nicknameBtn)}>
                        {nicknameBtn ? '닉네임 변경 취소' : '닉네임 변경'}
                      </button>
                      <div style={{ display: nicknameBtn ? 'block' : 'none' }}>
                        <div className="changeNickname">
                          <input
                            placeholder="변경할 닉네임 입력"
                            onChange={(e) => setNickname(e.target.value)}
                          ></input>
                          <button onClick={saveNickName}>닉네임 변경</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>비밀번호 변경</th>
                  <td>
                    <div className="passwordtable">
                      <table>
                        <tbody>
                          <tr>
                            <th>새 비밀번호</th>
                            <td>
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                disabled={true}
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호 다시 입력</th>
                            <td>
                              <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                disabled={true}
                              ></input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={{ color: 'red', padding: '8px' }}>
                        {pwalert ? null : '비밀번호가 일치하지 않습니다'}
                      </p>
                      <button onClick={patchPassword} disabled={true}>
                        비밀번호 변경
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="likesbook">
            <h1>내가 좋아한 책</h1>
            {status === 'loading' ? (
              <Loader custom={true} />
            ) : LikesBooks && LikesBooks.books.length > 0 ? (
              <Layout>
                <BookWrapper $isSuccess={isSuccess}>
                  {status === 'success' && (
                    <>
                      <ArrowButton>
                        <IoIosArrowBack
                          size={60}
                          onClick={() => handlePageClick(currentPage - 1)}
                        />
                      </ArrowButton>
                      {LikesBooks.books.map((data) => {
                        const { id, title, images, ...spread } = data;
                        console.log(data);
                        return (
                          <div key={id}>
                            <Book
                              key={id}
                              id={id}
                              images={images}
                              title={title}
                              {...spread}
                              onClick={() => handleClick(id)}
                            />
                            {modalOpen && (
                              <CustomModal
                                bookId={selectedBookId}
                                book={selectedBook}
                                setModalOpen={setModalOpen}
                                showScroll={showScroll}
                              ></CustomModal>
                            )}
                          </div>
                        );
                      })}
                      <ArrowButton>
                        <IoIosArrowForward
                          size={60}
                          onClick={() => handlePageClick(currentPage + 1)}
                        />
                      </ArrowButton>{' '}
                    </>
                  )}
                </BookWrapper>
              </Layout>
            ) : (
              <p>내가 좋아요한 책이 없습니다</p>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  position: relative;
  min-width: 1300px;
  min-height: 100vh;
  overflow: hidden;

  .userTable {
    min-height: 200px;
    margin: 100px 100px 30px;
    padding: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-collapse: collapse;
    color: black;
  }
  .editNickname {
    background-color: transparent;
  }

  .userTable table {
    border-collapse: collapse;
    width: 100%;
  }

  .userTable th {
    width: 200px;
  }

  .userTable th,
  .userTable td {
    border: 1px solid #ddd; /* 테이블의 경계 선 스타일 및 색상 설정 */
    padding: 8px;
    text-align: left;
  }

  .userTable .likesbook {
    align-items: center;
  }

  .userTable th {
    background-color: #f2f2f2; /* 헤더 배경색 설정 */
  }

  button {
    padding: 5px 10px;
    margin: 0px 20px 0px;
    border: 1px solid #bcbfc6;
    color: #777;
    background-color: #fafbf6;
    background-image: linear-gradient(#fff, #f1f1f1);
    font-size: 11px;
  }

  .changeNickname {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #dadde4;
    background-color: #f0f0f0;
    color: #555;
    font-size: 11px;
    width: 70%;

    input {
      height: 22px;
      padding: 2px 5px;
      line-height: 22px;
      border: 1px solid #dadde4;
    }
  }

  .passwordtable {
    font-size: 12px;
    width: 270px;
  }
  .passwordtable th {
    border: none;
    background-color: transparent;
  }

  .passwordtable table {
    border-collapse: separate;
  }

  .passwordtable button {
    margin: 15px 8px;
  }

  h1 {
    color: black;
  }
  .likesbook h1 {
    margin-top: 80px;
  }
`;

// const NicknameBtn = styled.button`
//   background-image: linear-gradient(
//     to right,
//     ${(props) => (props.btnState ? '#a8abba, #8c8f98' : '#fff, #f1f1f1')}
//   );
// `;

const Wrapper = styled.div`
  grid-template-columns: repeat(12, 1fr);
  color: rgba(31, 31, 31, 0.7);
  font-weight: 900;
  padding-top: 80px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;

const ArrowButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  cursor: pointer;
  margin: 0 50px;
`;
const ProfileImgBtnWrap = styled.div`
  margin: 10px 0;
`;
