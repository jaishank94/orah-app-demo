import React from "react"
import styled from "styled-components"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Images } from "assets/images"
import { Colors } from "shared/styles/colors"
import { Person, PersonHelper } from "shared/models/person"
import { RollInput } from "shared/models/roll"
import { RollStateSwitcher } from "staff-app/components/roll-state/roll-state-switcher.component"

interface Props {
  isRollMode?: boolean
  student: Person
  isFilterMode?: boolean
  onItemClick?: (status: string) => void
}
export const StudentListTile: React.FC<Props> = ({ isRollMode, isFilterMode, student, onItemClick }) => {
  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content>
        <div>
          {PersonHelper.getFullName(student)}
          <br />
          <br />
          <>Roll ID: {student.id}</>
        </div>
      </S.Content>
      {!isFilterMode && isRollMode && (
        <S.Roll>
          <RollStateSwitcher onStateChange={(status) => onItemClick && onItemClick(status)} />
        </S.Roll>
      )}
      {isFilterMode && (
        <div
          style={{
            fontWeight: 800,
            color: student.status === "unmark" ? "grey" : student.status === "present" ? "green" : student.status === "late" ? "orange" : "black",
          }}
        >
          {student.status?.toUpperCase()}
        </div>
      )}
    </S.Container>
  )
}

interface rollProps {
  roll: RollInput
  student?: Person
  size?: number
}

export const RollListTile: React.FC<rollProps> = ({ student, roll }) => {
  let rollesData: any = roll
  let studData: any = student
  return (
    <S.Container>
      <S.Avatar url={Images.avatar}></S.Avatar>
      <S.Content>
        {studData !== undefined &&
          studData.students.map((stId: any) => {
            let studentNames: any
            if (stId.id === rollesData.student_id) {
              studentNames = (
                <div>
                  <>{PersonHelper.getFullName(stId)}</>
                  <br />
                  <br />
                  <>Roll ID: {rollesData.student_id}</>
                </div>
              )
            }
            return studentNames
          })}
      </S.Content>
      <S.Roll>
        <span
          style={{
            fontWeight: 800,
            color: rollesData.roll_state === "unmark" ? "grey" : rollesData.roll_state === "present" ? "green" : rollesData.roll_state === "late" ? "orange" : "black",
          }}
        >
          {rollesData.roll_state.toUpperCase()}
        </span>
      </S.Roll>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    margin-top: ${Spacing.u3};
    padding-right: ${Spacing.u2};
    display: flex;
    height: 60px;
    border-radius: ${BorderRadius.default};
    background-color: #fff;
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
    }
  `,
  Avatar: styled.div<{ url: string }>`
    width: 60px;
    background-image: url(${({ url }) => url});
    border-top-left-radius: ${BorderRadius.default};
    border-bottom-left-radius: ${BorderRadius.default};
    background-size: cover;
    background-position: 50%;
    align-self: stretch;
  `,
  Content: styled.div`
    flex-grow: 1;
    padding: ${Spacing.u2};
    color: ${Colors.dark.base};
    font-weight: ${FontWeight.strong};
  `,
  Roll: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u4};
  `,
}
